class PeopleController < ApplicationController

  before_filter :authenticate_user!


  # GET /people
  # GET /people.json
  def index
    @people = Person.by_user(current_user.id).includes(:informations).order(:firstname, :lastname).page params[:page]
    @total = Person.by_user(current_user.id).size
    @processed = Person.by_user(current_user.id).where(:processed => true).size
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @people }
    end
  end

  # GET /people/1
  # GET /people/1.json
  def show
    @person = Person.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @person }
    end
  end

  # GET /people/new
  # GET /people/new.json
  def new
    @person = Person.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @person }
    end
  end

  # GET /people/1/edit
  def edit
    @person = Person.find(params[:id])
  end

  # POST /people
  # POST /people.json
  def create
    @person = Person.new(params[:person])
    @person.user_id = current_user.id

    respond_to do |format|
      if @person.save
        format.html { redirect_to people_url, notice: 'Person was successfully created.' }
        format.json { render json: @person, status: :created, location: @person }
      else
        format.html { render action: "new" }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /people/1
  # PUT /people/1.json
  def update
    @person = Person.find(params[:id])
    information_id_validated = params[:person][:linkedin_information_id]

    # set all informations to false except information_id_validated to true   
    @person.informations.each do |info|
      unless info.id == information_id_validated.to_i
        info.update_attribute(:validated, false) 
      else
        info.update_attribute(:validated, true) 
      end
    end

    respond_to do |format|
      if @person.update_attributes(params[:person])
        format.html { redirect_to people_url, notice: 'Person was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1
  # DELETE /people/1.json
  def destroy
    @person = Person.find(params[:id])
    @person.destroy

    respond_to do |format|
      format.html { redirect_to people_url }
      format.json { head :ok }
    end
  end
  
  def upload_csv
    require 'csv'
    
    file = CSV.parse(params[:person][:csv].tempfile)
    people = []
    file.each do |row|
      Person.create(:firstname => row[0], :lastname => row[1], :user_id => current_user.id)
      people << [row[0], row[1]]
    end  
    redirect_to :people
  end
  
  def refresh
    person = Person.find(params[:id])
    fetcher_linkedin = Fetcher::Linkedin.new
    result = fetcher_linkedin.fetch(person)
    has_profiles_linkedin = result.has_profiles
    has_error_linkedin = result.has_error
    error_message_linkedin = result.error_message
    
    fetcher_paperjam = Fetcher::Paperjam.new
    result = fetcher_paperjam.fetch(person)
    has_profiles_paperjam = result.has_profiles
    
    render json: { 
      :title => result.title,
      :has_profiles_linkedin => has_profiles_linkedin,
      :has_error_linkedin => has_error_linkedin,
      :error_message_linkedin => error_message_linkedin,
      :has_profiles_paperjam => has_profiles_paperjam,
    }
  end
  
  def export_csv
    require 'CSV'
    
    #@people = Person.by_user(current_user.id).includes(:informations).order(:firstname, :lastname)
    @people = Person.by_user(current_user.id).with_validated_informations.order(:firstname, :lastname)
    
    filename = "people-#{Time.now.strftime("%d-%m-%Y")}.csv"
     if request.env['HTTP_USER_AGENT'] =~ /msie/i
       headers['Pragma'] = 'public'
       headers['Content-type'] = 'text/plain'
       headers['Cache-Control'] = 'no-cache, must-revalidate, post-check=0, pre-check'
       headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
       headers['Expires'] = '0'
     else
       headers['Content-type'] ||= 'text/csv'
       headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
     end

     render :layout => false
  end  
  
  def status
    @total = Person.by_user(current_user.id).size
    @processed = Person.by_user(current_user.id).where(:processed => true).size
    render :layout => false
    
  end
end

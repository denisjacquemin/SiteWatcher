class PeopleController < ApplicationController

  before_filter :authenticate_user!


  # GET /people
  # GET /people.json
  def index
    @people = current_user.people.order(:firstname, :lastname).page params[:page]
    
    respond_to do |format|
      format.html
      format.json { render json: @people }
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
    @person = Person.find_by_firstname_and_lastname(params[:person][:firstname].strip.capitalize, params[:person][:lastname].strip.capitalize)
    @person = Person.new(params[:person]) if @person.nil?
    @person.users << current_user unless @person.users.include?(current_user) 

    respond_to do |format|
      if @person.save
        format.html { redirect_to people_url, notice: "#{@person.firstname} #{@person.lastname} was successfully created." }
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

    respond_to do |format|
      if @person.update_attributes(params[:person])
        format.html { redirect_to edit_person_url(@person), notice: "#{@person.firstname} #{@person.lastname} was successfully updated." }
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
    @person.users.delete(current_user)
    if @person.users.empty?
      @person.destroy
    end
    
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
      person = Person.find_by_firstname_and_lastname(row[0].capitalize, row[1].capitalize)
      person = Person.new(:firstname => row[0], :lastname => row[1]) if person.nil?
      person.users << current_user unless person.users.include?(current_user) 
      person.save
    end  
    redirect_to :people
  end
  
  def export_csv
    require 'csv'
    @people = current_user.people.order(:firstname, :lastname)
    
    filename = "profiles-#{Time.now.strftime("%d-%m-%Y")}.csv"
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
  
  def next_person
    # fetch all people ids for current_user ordered by firstname and lastname
    people_ids = current_user.people.order(:firstname, :lastname).pluck(:id)
      
    # find the current person's id index in the collection
    position = people_ids.index(params[:id].to_i)
            
    # redirect to the edit page for the next person
    redirect_to edit_person_url(people_ids.at(position+1))
  end
  
end

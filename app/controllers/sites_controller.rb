require 'open-uri'


class SitesController < ApplicationController
  
  # GET /sites
  # GET /sites.json
  def index
    @sites = Site.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @sites }
    end
  end

  # GET /sites/1
  # GET /sites/1.json
  def show
    @site = Site.find(params[:id])    
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @site }
    end
  end

  # GET /sites/new
  # GET /sites/new.json
  def new
    @site = Site.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @site }
    end
  end

  # GET /sites/1/edit
  def edit
    @site = Site.find(params[:id])
  end

  # POST /sites
  # POST /sites.json
  def create
    @site = Site.new(params[:site])

    respond_to do |format|
      if @site.save
        format.html { redirect_to @site, notice: 'Site was successfully created.' }
        format.json { render json: @site, status: :created, location: @site }
      else
        format.html { render action: "new" }
        format.json { render json: @site.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /sites/1
  # PUT /sites/1.json
  def update
    @site = Site.find(params[:id])

    respond_to do |format|
      if @site.update_attributes(params[:site])
        format.html { redirect_to @site, notice: 'Site was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @site.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sites/1
  # DELETE /sites/1.json
  def destroy
    @site = Site.find(params[:id])
    @site.destroy

    respond_to do |format|
      format.html { redirect_to sites_url }
      format.json { head :ok }
    end
  end
  
  def compare
    site_id = params[:selection][:site_id]
    firstSelection = params[:selection][:first]
    secondSelection = params[:selection][:second]

    site = Site.find(site_id)
    doc1 = Nokogiri::HTML(Snippet.find(firstSelection).content)
    doc2 = Nokogiri::HTML(Snippet.find(secondSelection).content)
        
    diff = DiffHtml.diff(doc1.at_css(site.selector).to_s, doc2.at_css(site.selector).to_s)
    
    #get the document and replace the snippet by the diff snippet
    doc = Nokogiri::HTML(open(site.url))
    current_snippet = doc.at_css(site.selector)
    puts doc.to_xhtml
    current_snippet.replace(diff)
    
    kit = IMGKit.new(doc, :quality => 50)
    kit.to_file('/Users/denisjacquemin/file.jpg')
    
    render json: {
      :content => diff
    }
    
  end
end

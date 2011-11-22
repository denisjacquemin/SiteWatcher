require 'open-uri'


class SitesController < ApplicationController
  
  before_filter :authenticate_user!
  
  # GET /sites
  # GET /sites.json
  def index
    @sites = Site.by_user(current_user.id)
    
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
    @site.user_id = current_user.id

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
        
    diff_snippet = DiffHtml.diff(doc1.at_css(site.selector).to_s, doc2.at_css(site.selector).to_s)
    
    # get stylesheets
    doc = Nokogiri::HTML(open(site.url))
    snippet_to_replace = doc.at_css(site.selector)
    
    # build nokogiri object 
    new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}"    

    snippet_to_replace.parent = new_snippet
    
    # manage stylesheets
    stylesheets = doc.css("link[href$='css']")
    @html = doc.to_html
    
    css = stylesheets.collect do |stylesheet|
      href = stylesheet.attr('href')
      root = site.url
      
      stylesheet_full_url = URI.parse(root).merge(URI.parse(href)).to_s
      
      puts href
      puts stylesheet_full_url
      
      @html.gsub(href, stylesheet_full_url)
      
    end
    
    render :layout => false
    
  end
end

class Person < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :profiles, :dependent => :destroy

  validates :firstname, :lastname, :presence => true
  
  before_save :format_names
  after_save :put_in_queue_fetch # after_save runs both on create and update

  def current_jobtitle
      self.profiles.map {|p| p.element('jobtitle')}.join(', ')
  end
  
  def has_linkedin_profiles?
    self.profiles.linkedin.count > 0
  end
  
  def has_paperjam_profiles?
    self.profiles.paperjam.count > 0
  end
  
  protected
  
  def format_names
    puts "before: #{self.lastname}"
    self.firstname = self.firstname.strip.capitalize
    self.lastname = self.lastname.strip.capitalize
    puts "after: #{self.lastname}"
    
  end
  
  def put_in_queue_fetch
    # add to delayed_fetch_job_queue
    self.delay.fetch_linkedin
    self.delay.fetch_paperjam
    self.delay.fetch_viadeo
  end
  
  def fetch_linkedin
    fetcher_linkedin = Fetcher::Linkedin.new
    fetcher_linkedin.fetch(self)
  end
  
  def fetch_paperjam
    fetcher_paperjam = Fetcher::Paperjam.new
    fetcher_paperjam.fetch(self)
  end
  
  def fetch_viadeo
    fetcher_viadeo = Fetcher::Viadeo.new
    fetcher_viadeo.fetch(self)
  end
end

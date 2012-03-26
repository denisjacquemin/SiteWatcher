class Person < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :profiles

  validates :firstname, :lastname, :presence => true
  
  scope :by_user, lambda { |user_id| where(:user_id => user_id) }
  scope :with_validated_informations, includes(:informations).where('information.validated' => true ) #.where(:published => true)
  scope :with_info_paperjam, includes(:info_paperjams)
  
  before_save :capitalize
  after_save :queue_fetch # after_save runs both on create and update

  def current_jobtitle
      valid_profiles = self.profiles.validated
      jobtitles = valid_profiles.map{|p| p.elements.pluck(:jobtitle)}
      jobtitles.join(',')
  end
  
  def has_linkedin_profiles?
    self.profiles.linkedin.count > 0
  end
  
  def has_paperjam_profiles?
    self.profiles.paperjam.count > 0
  end
  
  
  
  protected
  
  def capitalize
    self.firstname = self.firstname.capitalize
    self.lastname = self.lastname.capitalize
  end
  
  def queue_fetch
    # add to delayed_fetch_job_queue
    #self.delay.fetch_linkedin
    #self.delay.fetch_paperjam
  end
  
  def fetch_linkedin
    fetcher_linkedin = Fetcher::Linkedin.new
    fetcher_linkedin.fetch(self)
  end
  
  def fetch_paperjam
    fetcher_paperjam = Fetcher::Paperjam.new
    fetcher_paperjam.fetch(self)
  end
end

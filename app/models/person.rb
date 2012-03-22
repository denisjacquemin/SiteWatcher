class Person < ActiveRecord::Base
  has_many :profiles
  has_many :users, :through => :profiles

  validates :firstname, :lastname, :presence => true

  def current_title
      informations = self.informations.where(:validated => true)
  
      if informations.empty?
        ""
      elsif informations.size == 1
        informations[0].title
      else
        "found #{informations.count} profile(s)"
      end
  end
  
  def has_linkedin_profiles?
    ! self.informations.empty?
  end
  
  def has_paperjam_profiles?
    ! self.info_paperjams.empty?
  end
  
  scope :by_user, lambda { |user_id| where(:user_id => user_id) }
  scope :with_validated_informations, includes(:informations).where('information.validated' => true ) #.where(:published => true)
  scope :with_info_paperjam, includes(:info_paperjams)
  
  before_save :capitalize
  after_save :queue_fetch # after_save runs both on create and update
  
  protected
  
  def capitalize
    self.firstname = self.firstname.capitalize
    self.lastname = self.lastname.capitalize
  end
  
  def queue_fetch
    # add to delayed_fetch_job_queue
    self.delay.fetch_linkedin
    self.delay.fetch_paperjam
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

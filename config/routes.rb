SiteWatcher::Application.routes.draw do

  match 'people/status' => 'people#status'
  match 'people/export_csv' => 'people#export_csv', :as => :export_people_csv
  match 'person/refresh/:id' => 'people#refresh', :as => :refresh
  match 'people/upload_csv' => 'people#upload_csv'
  resources :people, :except => :show

  match 'showdifference' => 'sites#show_difference', :as => :show_difference
  devise_scope :user do
    get "login", :to => "devise/sessions#new"
    get "logout", :to => "devise/sessions#destroy"
    get "account", :to => "devise/registrations#edit"
  end
  #devise_for :users, :path_names => { :sign_in => 'login', :sign_out => 'logout', :password => 'secret', :confirmation => 'verification', :unlock => 'unblock', :registration => 'register', :sign_up => 'cmon_let_me_in' }
  devise_for :users

  match 'sites/compare' => 'sites#compare' 
  match 'dashboard' => 'dashboard#index'
  resources :sites

  unauthenticated do
    as :user do
      root :to => 'devise/sessions#new'
    end
  end

  root :to => 'people#index'

end

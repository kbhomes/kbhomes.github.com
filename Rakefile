REMOTE_URL = 'https://github.com/kbhomes/kbhomes.github.com'

desc 'Deploy rendered Jekyll site to Github Pages'
namespace :site do
  task :deploy, :message do |task, args|
    message = args['message']
    message ||= 'Deploying site'

    # The general idea is to turn the _site directory into a new git repository,
    # add the website repository as a remote, and push to the repository.
    cd '_site' do

      # Only initialize the git repository if it is not already created.
      unless Dir.exists? '.git'
        puts 'Creating git repository and setting remote'
        `git init`
        `git remote add origin #{REMOTE_URL}`
      end

      # Only create the .gitignore if it is not available
      unless File.exists? '.gitignore'
        copy '../.deploy-gitignore', './.gitignore'
      end

      # Add everything to the commit.
      puts 'Committing all _site files'
      `git add .`
      `git commit -m "#{message}"`

      # Push to the remote.
      puts 'Pushing to remote repository'
      `git push origin master --force`
    end
  end
end
desc "Ping URL to keep a dyno alive"
task :dyno_ping do
    require 'net/http'
    uri = URI("http://stanleycen.com/")
    Net::HTTP.get_response(uri)
end

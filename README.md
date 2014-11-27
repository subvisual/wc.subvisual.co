# WC Occupancy Detector

![Logo](logo.png)

## Requirements

* [Raspberry PI](http://www.raspberrypi.org/)
* [AirPi](http://airpi.es/)

## Server Installation

As this is a hackaton project, there's no magic command that makes it all work.
Some manual work is required

1. Deploy this repo to a server of your choice. We used [heroku](http://heroku.com).
2. The database must be created manually, and must be PostgreSQL. Heroku has a [Postgres plugin](https://addons.heroku.com/heroku-postgresql) that helps with that.
Since we only need a single row per bathroom in our database, the free heroku
plan is enough (unless we eventually move into a really huge building).
To manually create the database, the following SQL should be enough:

```sql
CREATE table bathrooms (
  name text,
  status boolean DEFAULT false,
  updated_at timestamp DEFAULT NULL,
  PRIMARY KEY(name)
);
```

Now create a record for each of the bathrooms you want to manage, giving them
a unique name:

```
INSERT INTO bathrooms VALUES("bathroom-name");
```

Now your server is ready, with a public (insecure) API.
You can set the status of each of your bathrooms by sending PUT requests to the
appropriate URL

```
# set bathroom as busy
http://wc.groupbuddies.com/bathroom-name/true

# set bathroom as free
http://wc.groupbuddies.com/bathroom-name/false
```

# Sensor installation

1. Set up your Raspberry Pi + AirPi (we recommend Raspbian)
2. Download the repo to `/var/www/wc`

```
git clone http://github.com/groupbuddies/wc.groupbuddies.com /var/www/wc
```

3. Edit the `sensor/settings.cfg` file, particularly the `url` field, with the url
of the individual bathroom you're handling

4. An `init.d` script is included (no `systemd` yet, sorry), so assuming your distribution support is, just run:

```
ln -s /var/www/wc/sensor/init.sh /etc/init.d/wc
```

# TODO

* More support for multiple bathrooms
* Security. Add a secret token to each bathroom

# Credits

* [Miguel Palhas](https://github.com/naps62) (Developer)
* [Pedro Costa](https://github.com/pfac) (Developer)
* [The AirPi project](https://github.com/tomhartley/AirPi) (source code base)

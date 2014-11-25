#!/bin/sh
### BEGIN INIT INFO
# Provides: wc
# Required-Start: $local_fs
# Required-Stop: $local_fs
# Default-Start: 2 3 4 5 # Default-Stop: 0 1 6
# Short-Description: wc.groupbuddies.com pusher
# Description: updates data on wc.groupbuddies.com
### END INIT INFO

set -e

DESC="wc"
name="wc"

do_start() {
  echo "starting";
  python /home/pi/wc.groupbuddies.com/sensor/ldr.py &
}

do_stop() {
  test -e /tmp/ldr.pid && kill $(/tmp/ldr.pid)
}

do_restart() {
  do_stop
  do_start
}

case "$1" in
  start)
    do_start
    ;;
  stop)
    do_stop
    ;;
  restart)
    do_restart
    ;;
  status)
    do_status
    ;;
  *)
    log_success_message "Usage: /etc/init.d/wc {start|stop|status|restart}"
esac

exit 0

# vim:set ai et sts=2 sw=2 tw=0

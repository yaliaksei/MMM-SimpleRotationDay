/* MagicMirror²
 * Module: MMM-SimpleRotationDay
 *
 * Description: display today's school rotation (encore) day.
 * Depends on default calendar module broadcasted events
 * 
 * By Aliaksei Sery
 * MIT Licensed.
 */
Module.register("MMM-SimpleRotationDay", {
	// Default module config.
	defaults: {
		//update every 5 minutes
		updateInterval: 5 * 60 * 1000,
		//fade speed
		fadeSpeed: 4000,
		//initial load delay
		initialLoadDelay: 0,
		//retry delay
		retryDelay: 2500,
		// rotation calendar name as defined in default 'calendar' module
        rotationCalendar: "",
        rotationSchedule: [],
	  },

	start: function () {
		Log.info("Starting module: " + this.name);

        this.events = [];

		setInterval(() => {
		  this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

    getHeader: function() {
		return "Rotation today"
	},

    notificationReceived: function(notification, payload, sender) {
	    if (notification === "CALENDAR_EVENTS") {
			this.events = payload.map(e => {
                e.startDate = new Date(+e.startDate);
				return e;
			}).filter( e => {
                Log.log("Process event for calendar " + e.calendarName);
				if (e.calendarName == this.config.rotationCalendar) {
					return true;
				}
		    });

            this.updateDom();
        }
    }, 

	getDom: function() {
		const wrapper = document.createElement("table");
        wrapper.setAttribute("class", "simple_rotation_day bright")
        
        events = this.events;
        today = new Date();

        for (var e in events) {
			var event = events[e];
            if(today.getDate() == event.startDate.getDate() 
                && today.getFullYear() == event.startDate.getFullYear() 
                && today.getMonth() == event.startDate.getMonth()) {

                    Log.log("Rotation today: " + event.title)

                    schedules = this.config.rotationSchedules;
                    for (var s in schedules) {
                        
                        studentName = schedules[s].studentName;
                        Log.log("Getting rotation for " + studentName)        
                        for (var r in schedules[s].days) {
                            Log.log("Inspecting day " + schedules[s].days[r].day);
                            if (schedules[s].days[r].day == event.title) {
                                eventWrapper = document.createElement("tr");
                                titleWrapper = document.createElement("td");
                                titleWrapper.innerHTML = event.title;
                                eventWrapper.appendChild(titleWrapper);
                                wrapper.appendChild(eventWrapper);
                            }
                        }
                    }
                break;
            }
        }

        return wrapper;
	}
});

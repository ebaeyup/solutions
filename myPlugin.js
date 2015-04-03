(function ($) {
    //sample data
    var data = [{ "title": "event 1", "date": "2015/09/10" },
                { "title": "event 2", "date": "2015/09/25", "enddate": "2015/09/30" },
                { "title": "event 3", "date": "2015/09/27" },
                { "title": "event 4", "date": "2015/09/30" }];
    // 
    $.fn.theCalendar = function () {
		
		var divCalendar = $('<div class="cal-container" />');
		
		var divGrid = $('<div />').addClass('cal-grid');
				
		var gun = new Date(data[0].date).getDay();
		var yil = new Date(data[0].date).getFullYear();
		var ay = new Date(data[0].date).getMonth();
		
		//ay hangi gün başlıyo
		var ilkGun = new Date(yil,ay,01).getDay();	
		
		//ayın gün sayısıı
		var gunSayisi = new Date(yil, ay, 0).getDate();
		
		divCalendar.append(divGrid);
		
		var daysoftheweek = $('<div class="days-of-the-week"></div>');
		
		divGrid.append(daysoftheweek);
		
		//günleri yazdır
		var array = ["Pazartesi","Sali","Carsamba","Persembe","Cuma","Cumartesi","Pazar"];		
		for(var i = 0; i<7; i++){
			daysoftheweek.append('<div class="header-day">'+array[i]+'</div>');
		}
		
		var divDays = $('<div class="days"></div>');
		daysoftheweek.append(divDays);
		
		//eğer ilk gün pazartesi değilse ve hangi gün ise ona göre uygun adette boşluk bırak
		for(var i = 0; i< ilkGun-1; i++){
			divDays.append('<div class="day"><span class="day-number"></span></div>');
		}
		//günleri doldur
		for(var i = 0; i< gunSayisi; i++){
			divDays.append('<div class="day day-'+(i+1)+'"><span class="day-number">'+(i+1)+'</span></div>');
		}
		//son alanlarda kalan boşlukları dinamik bir şekilde doldur
		for(var i = 0; i< 35-(gunSayisi+(ilkGun-1)); i++){
			divDays.append('<div class="day"><span class="day-number"></span></div>');
		}
		
        //Calendar tarih aralıkları kurala uyuyor mu denetimini yaptığımız değişken
        var CalShowStatus = true;
		var wrongDatedEvent;
        var firstDate = new Date(data[0].date).getMonth();
        //kural uyumu  kntrolü için döngü
        for (var i = 0; i < data.length; i++) {
            var endDate = new Date(data[i].date).getMonth();
            if (firstDate != endDate) {
                CalShowStatus = false;
		wrongDatedEvent = data[i].title;
                break;
            }
            else { }
        }

        //eğer kurala uyuyorsa calendar üzerinde göster
        if (CalShowStatus) {
            $("div.cal").html(divCalendar);
            for (var i = 0; i < data.length; i++) {
                var date = new Date(data[i].date).getMonth();
                var day = new Date(data[i].date).getDate();
                /////
                var cl = '.day-' + day;
                var eventName = data[i].title;
                var duration = 1;
                var size, eventEl;
                var margin = 10;
				var newDay = day;
                if (data[i].enddate !== undefined) {
                    var enddate = new Date(data[i].enddate);
                    duration = enddate.getDate() - day + 1;
		
			var deneme = cl;
			for(var k = 0; k< duration; k++){
				margin = i * margin;
				eventEl = '<div class="event" style="width:' +
				100 + '%; margin-top:' + margin + 'px;">' + eventName + '</div>';
				$(deneme).append(eventEl);
				
				if(newDay != enddate){
					newDay = newDay + 1;
					deneme = '.day-' + newDay;
				}else{
					break;
				}
			}
                } else {
                    margin = i * margin;
                    eventEl = '<div class="event" style="margin-top:' + margin + 'px;">' + eventName + '</div>';
                    $(cl).append(eventEl);
                }
            }
        }
        //eğer kurala uymuyosa hata mesajını yazdr
        else {
            console.log(wrongDatedEvent + " date is not matching with " + data[0].title + "(" +  data[0].date + ")");
        }
    };
	function addHeaderDay(){
		
	}
})(jQuery);

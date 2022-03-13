import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BankService } from "./services/bank.service";
import { map } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
@Injectable()
export class AppComponent implements OnInit {
  constructor(private bankService: BankService, private http: HttpClient) {}
  title = "Weather";

  ngOnInit(): void {
    this.load();
  }

  public place;
  public firstMinTemp;
  public firstMaxTemp;
  public firstAverageWind;
  public firstLongWeekday;
  public firstTime;
  public firstFile;
  public firstSummary;
  public resultList;

  load() {
    var self = this;
    this.place = "Gothenburg";

    const longWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
                          "Thusday", "Friday", "Saturday"];
    const shortWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const path = "https://github.com/nrkno/yr-weather-symbols" + 
                 "/blob/master/dist/png/100/";

    const summaryMap =
      { "clearsky": "01",
        "fair": "02",
        "partlycloudy": "03",
        "fog": "15",
        "cloudy": "04",
        "lightrain": "46",
        "rain": "09",
        "heavyrain": "10",
        "lightsleet": "47",
        "sleet": "07",
        "heavysleet": "48",
        "lightsnow": "49",
        "snow": "13",
        "heavysnow": "50",
        "lightrainshowers": "40",
        "rainshowers": "05",
        "heavyrainshowers": "41",
        "lightsleetshowers": "42",
        "sleetshowers": "07",
        "heavysleetshowers": "43",
        "lightsnowshowers": "44",
        "snowshowers": "08",
        "heavysnowshowers": "45",
        "lightrainshowersandthunder": "24",
        "heavyrainshowersandthunder": "06",
        "lightsleetshowersandthunder": "26",
        "sleetshowersandthunder": "20",
        "heavysleetshowersandthunder": "27",
        "lightsnowshowersandthunder": "28",
        "snowshowersandthunder": "21",
        "heavysnowshowersandthunder": "29",
        "lightrainandthunder": "30",
        "rainandthunder": "22",
        "heavyrainanddhunder": "11",
        "lightsleetandthunder": "31",
        "sleetandthunder": "23",
        "heavysleetandthunder": "32",
        "lightsnowandthunder": "33",
        "snowandthunder": "14",
        "heavysnowandthunder": "34"
      };

   self.http.get("https://api.met.no/weatherapi/locationforecast/2.0/" +
                 "complete?lat=57.7&lon=12.0").subscribe(value => {
      let timeseries = value["properties"]["timeseries"];

      let startTime = new Date(timeseries[0]["time"]);
      let startDay = Math.trunc(startTime.getTime() / (1000*60*60*24));

      let resultList = [];
      for (let index = 0; index < 7; ++ index) {
        resultList[index] = {"minTemp": -1, "maxTemp": -1, "windSum": 0,
                             "windCount": 0, "averageWind": 0,
                             "shortWeekday": "",  "longWeekday": "",
                             "hour":0, "minute":0, "summary": null,
                             "file": ""};
      }

      timeseries.forEach(
        function (timeserie) {
          let currentTime = new Date(timeserie["time"]);

          let data = timeserie["data"]
          let details = data["instant"]["details"];
          let temp = Math.round(details["air_temperature"]);
          let wind = details["wind_speed"];
          let summary = null;

          if (data["next_12_hours"] != undefined) {
            summary = data["next_12_hours"]["summary"]["symbol_code"];
          }
          else if (data["next_6_hours"] != undefined) {
            summary = data["next_6_hours"]["summary"]["symbol_code"];
          }
          else if (data["next_1_hours"] != undefined) {
            summary = data["next_1_hours"]["summary"]["symbol_code"];
          }

          let currentDay = Math.trunc(currentTime.getTime() /
                           (1000*60*60*24));
          let index = currentDay - startDay,
              currentHours = currentTime.getHours();
          if (currentHours == 0) {
            ++index;
          }

          if (index < 7) {
            let minTemp = resultList[index]["minTemp"];
            if ((minTemp == -1) || (temp < minTemp)) {
              resultList[index]["minTemp"] = temp;
            }

            let maxTemp = resultList[index]["maxTemp"];
            if ((maxTemp == -1) || (temp > maxTemp)) {
              resultList[index]["maxTemp"] = temp;
            }

            resultList[index]["hour"] = currentTime.getHours();
            resultList[index]["minute"] = currentTime.getMinutes();
            resultList[index]["windSum"] += wind;
            ++resultList[index]["windCount"];
            let weekday = currentTime.getDay();
            resultList[index]["shortWeekday"] = shortWeekdays[weekday];
            resultList[index]["longWeekday"] = longWeekdays[weekday];
            resultList[index]["url"] = "https://github.com/nrkno/" +
                      "yr-weather-symbols/blob/master/dist/svg/04.svg";

            if ((resultList[index]["summary"] == null) &&
                (summary != null)) {
              resultList[index]["summary"] = summary;

              let postfix = "";

              if (summary.includes("_day")) {
                let index = summary.indexOf("_day");
                summary = summary.substr(0, index);
                postfix = "d";
              }
              else if (summary.includes("_night")) {
                let index = summary.indexOf("_night");
                summary = summary.substr(0, index);
                postfix = "n";
              }
              else if (summary.includes("_polarnight")) {
                let index = summary.indexOf("_polarnight");
                summary = summary.substr(0, index);
                postfix = "m";
              }

              resultList[index]["file"] = path + summaryMap[summary] +
                                          postfix + ".png";
            }
          }
        }
      );

      for (let index = 0; index < 7; ++ index) {
        resultList[index]["averageWind"] =
          Math.trunc(resultList[index]["windSum"] /
          resultList[index]["windCount"]);
      }

      this.firstMinTemp = resultList[0]["minTemp"];
      this.firstMaxTemp = resultList[0]["maxTemp"];
      this.firstAverageWind = resultList[0]["averageWind"];
      let hour = resultList[0]["hour"],
          minute = resultList[0]["minute"];
      this.firstTime = ((hour < 10) ? "0" : "") + hour + ":" +
                       ((minute < 10) ? "0" : "") + minute;
      this.firstLongWeekday = resultList[0]["longWeekday"];
      this.firstSummary = resultList[0]["summary"];
      this.firstFile = resultList[0]["file"];
      this.resultList = resultList;
    });
  }
}

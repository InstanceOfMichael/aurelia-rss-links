import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Links {
  heading = 'HN Links';
  entries = [];
  lastViewedLink = null;

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:9050');
    });

    this.http = http;
  }

  // @todo highlight most recently clicked link
  viewingLink($event, entry) {
    // localStorage.lastViewedLink = '';
    this.lastViewedLink = entry.link;

    return true;// continue bubbling the event
                // user's browser will direct to http://${entry.link}
  }

  activate() {
    return this.http.fetch('/links')
      .then(response => response.json())
      // .then(function(response) {
      //   console.log(response);
      //   return response;
      // })
      .then(response => this.entries = response.entries.map(function(entry) {
        entry.debug_json = JSON.stringify(entry, null, 4);
        return entry;
      }))
      // .then(rss => this.rss = rss)
      ;
  }
}

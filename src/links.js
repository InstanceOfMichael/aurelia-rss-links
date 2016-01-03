import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Links {
  heading = 'HN Links';
  entries = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:9050');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('/links')
      .then(response => response.json())
      // .then(function(response) {
      //   console.log(response);
      //   return response;
      // })
      .then(response => this.entries = response.entries)
      // .then(rss => this.rss = rss)
      ;
  }
}

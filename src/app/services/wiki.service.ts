import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WikiService {

  baseurl: string = "https://en.wikipedia.org/api/rest_v1/page/summary/";

  constructor(private http: HttpClient) { }

  getSummary(productName: string) {
    let summary = '';
    return this.http.get<IResult>(this.baseurl + productName)
  }
}

interface IResult {
  type: string,
  title: string,
  displaytitle: string,
  namespace: {
      id: number,
      text: string,
  },
  wikibase_item: string,
  titles: {
      canonical: string,
      normalized: string,
      display: string,
  },
  pageid: number,
  thumbnail: {
      source: string,
      width: number,
      height: number,
  },
  originalimage: {
      source: string,
      width: number,
      height: number,
  },
  lang: string,
  dir: string,
  revision: string,
  tid: string,
  timestamp: string,
  description: string,
  description_source: string,
  content_urls: {
      desktop: {
          page: string,
          revisions: string,
          edit: string,
          talk: string,
      },
      mobile: {
          page: string,
          revisions: string,
          edit: string,
          talk: string,
      }
  },
  extract: string,
  extract_html: string,
}

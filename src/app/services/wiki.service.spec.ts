import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IWikiResponse } from '../models/IWikiResponse';

import { WikiService } from './wiki.service';

describe('WikiService', () => {
  let service: WikiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(WikiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSummary() should call http Get for the route', () => {
    let productName = 'Hydrogen';
    let wikiResponse: IWikiResponse = {
      type: '',
      title: 'Hydrogen',
      displaytitle: '',
    namespace: {
        id: 0,
        text: '',
    },
    wikibase_item: '',
    titles: {
        canonical: '',
        normalized: '',
        display: '',
    },
    pageid: 0,
    thumbnail: {
        source: '',
        width: 0,
        height: 0,
    },
    originalimage: {
        source: '',
        width: 0,
        height: 0,
    },
    lang: '',
    dir: '',
    revision: '',
    tid: '',
    timestamp: '',
    description: '',
    description_source: '',
    content_urls: {
        desktop: {
            page: '',
            revisions: '',
            edit: '',
            talk: '',
        },
        mobile: {
            page: '',
            revisions: '',
            edit: '',
            talk: '',
        }
    },
    extract: '',
    extract_html: '',
    }

    service.getSummary(productName).subscribe((res) => {
      expect(res.title).toEqual(productName);
    });

    const req = httpMock.expectOne('https://en.wikipedia.org/api/rest_v1/page/summary/Hydrogen');

    expect(req.request.method).toEqual('GET');

    req.flush(wikiResponse);

    httpMock.verify();

  });

});

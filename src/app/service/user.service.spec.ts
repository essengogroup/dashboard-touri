// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {Root} from "../model/root";


const userTest: User = {
  id: 1,
  full_name: "super admin",
  email: "super@admin.com",
  phone: null,
  profile_picture: null,
  address: null,
  email_verified_at: "2022-12-13T19:31:17.000000Z",
  created_at: "2022-12-13T19:31:17.000000Z",
  updated_at: "2022-12-13T19:31:17.000000Z"
}

const endpoint = `${environment.baseUrl}/users/1`;

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserService]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    //vérifier qu'il n'y a aucune requête en attente !
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {

    it('#getUser should return observable of user by id',()=>{
      let actualUser: User = {} as User;

      service.getUser(userTest.id).subscribe((root:Root<User>) => {
        actualUser = root.data;
      });

      const request = httpTestingController.expectOne(endpoint);
      request.flush(actualUser);

      expect(request.request.method).toBe("GET");
    });

  });

});

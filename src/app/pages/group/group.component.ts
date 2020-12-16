import { Component, OnInit } from '@angular/core';
import {Profile} from '../myprofile/profile-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  profileForm: any;
  groupList: any;

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    job_title: '',
    mobile_number: '',
    password: '',
  }

  constructor(private service: GlobalService) { }


  ngOnInit(): void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.groupList = profile.tag.groups;
      }
    );



  }


}

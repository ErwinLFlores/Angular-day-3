import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  profileForm: any;
  groupList: any;
  isLogged:boolean;


  constructor(private service: GlobalService) {
    this.isLogged = false;
  }


  ngOnInit(): void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.groupList = profile.tag.groups;
      }
    );

    this.service.isLogged.subscribe(
      (logged : any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
     );

     this.service.checkLogStatus();
  }


}

import { Component, OnInit } from '@angular/core';
import {UploadService} from '@api/upload.service';

@Component({
  selector: 'stf-disposal',
  templateUrl: './disposal.component.html',
  styleUrls: ['./disposal.component.scss']
})
export class DisposalComponent implements OnInit {

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
    this.uploadService.uploadPhoto(file);
  }

}

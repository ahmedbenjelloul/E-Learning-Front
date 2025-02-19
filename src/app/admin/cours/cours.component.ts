import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AddEditCoursComponent } from './add-edit-cours/add-edit-cours.component';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  id_user: any;
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private router : Router,private http: HttpClient) { }
  sideBarOpen = true;
  editmode:boolean=false;

  ngOnInit(): void {
  }
  AllCourses(){
   
  }
  add(){
    this.editmode=false;
    this.OpenDialog('1000ms','600ms','')


  }

  update(id:any){
    this.editmode=true;
   this.OpenDialog('1000ms','600ms',id)

   

  }
  OpenDialog(enteranimation:any,exitanimation:any,id:any){
    this.dialog.open(AddEditCoursComponent, {
      width: '500px',
      data: { id, editmo: true }
    });
    
   
        }
        showSuccessMessage() {
          const config = new MatSnackBarConfig();
          config.duration = 3000; // Duration in milliseconds
          config.horizontalPosition = 'center'; // Set the horizontal position to center
          config.verticalPosition = 'top'; // Set the vertical position to top
        
          this.snackBar.open('Delete succeeded!', 'Close', config);
        }
        
        showFailMessage() {
          
          const config = new MatSnackBarConfig();
          config.duration = 3000; // Duration in milliseconds
          config.horizontalPosition = 'center'; // Set the horizontal position to center
          config.verticalPosition = 'top'; // Set the vertical position to top
        
          this.snackBar.open('Delete failed!', 'Close', config);
        }     

}

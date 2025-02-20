import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AddEditCoursComponent } from './add-edit-cours/add-edit-cours.component';
import { CoursService } from 'src/app/services/cours.service';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  id_user: any;
  ListCours:any=[];
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private router : Router,private http: HttpClient,private service:CoursService) { }
  sideBarOpen = true;
  editmode:boolean=false;
  clearInput() {
    const input = document.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = '';
  }
  ngOnInit(): void {
    this.AllCourses();
  }
  AllCourses(){
    this.service.findAll().subscribe(reps=>{
      this.ListCours=reps
          })
  }
  update(id: any) {
    this.editmode = true;
    this.OpenDialog('1000ms', '600ms', id, this.editmode);
  }
  
  add() {
    this.editmode = false;
    this.OpenDialog('1000ms', '600ms', '', this.editmode);
  }
 
  OpenDialog(enteranimation: any, exitanimation: any, id: any, editmode: boolean) {
    this.dialog.open(AddEditCoursComponent, {
      width: '500px',
      data: { id, editmode } // Utilisation correcte de `editmode`
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
        supprimer(id: any) {
          
              this.service.supprimerUnCours(id).subscribe({
                next: () => {
                  this.AllCourses(); // Recharge la liste après suppression
                  this.showSuccessMessage();
                },
                error: () => {
                  this.showFailMessage();
                }
              });
            }
        }
       



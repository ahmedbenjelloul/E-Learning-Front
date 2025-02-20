import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CoursService } from 'src/app/services/cours.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-add-edit-cours',
  templateUrl: './add-edit-cours.component.html',
  styleUrls: ['./add-edit-cours.component.css']
})
export class AddEditCoursComponent implements OnInit {
  editmode: boolean = false;
  editdata: any;
  respdata: any;
  ListFormations: any = [];
  
  Reactiveform: FormGroup = new FormGroup({
    idCours: new FormControl({ value: 0, disabled: true }, { nonNullable: true }),
    titre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    prix: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
  });

  constructor(
    private snackBar: MatSnackBar,
    private service: CoursService,
    @Inject(MAT_DIALOG_DATA) public d: any,
    public dialogRef: MatDialogRef<AddEditCoursComponent>
  ) {}

  ngOnInit(): void {
    this.editmode = this.d?.editmo || false;
    this.GetAllFormations();

    if (this.d?.id) {
      this.service.getUnCoursById(this.d.id).subscribe(response => {
        this.editdata = response;
        if (this.editdata) {
          this.Reactiveform.setValue({
            idCours: this.editdata.idCours || 0,
            titre: this.editdata.titre || '',
            description: this.editdata.description || '',
            prix: this.editdata.prix || 0,
          });
        }
      });
    }
  }

  getReservFormData() {
    if (this.Reactiveform.valid) {
      const editid = this.Reactiveform.get('idCours')?.value;
      if (editid && this.editmode) {
        this.updateFormation();
      } else {
        this.addFormation();
      }
    } else {
      alertifyjs.error("Merci d'entrer des données valides pour la formation");
    }
  }

  addFormation() {
    const coursData = this.Reactiveform.getRawValue();
    this.service.ajouterUnCours(coursData).subscribe(result => {
      this.respdata = result;
      if (this.respdata) {
        this.dialogRef.close();
        this.showSuccessMessage();
      }
      location.reload();
    });
  }

  updateFormation() {
    const editid = this.Reactiveform.get('idCours')?.value;
    const coursData = this.Reactiveform.getRawValue();
    this.service.updateUnCours(editid, coursData).subscribe(result => {
      this.respdata = result;
      if (this.respdata) {
        this.dialogRef.close();
        this.showUpdateMessage();
      }
      location.reload();
    });
  }

  GetAllFormations() {
    this.service.findAll().subscribe(reps => {
      this.ListFormations = reps;
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Cours ajouté!', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showUpdateMessage() {
    this.snackBar.open('Cours modifié!', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailOrPhoneRequired } from '../shared/customerror.directive';

@Component({
  selector: 'app-jobportal',
  templateUrl: './jobportal.component.html',
  styleUrls: ['./jobportal.component.css']
})
export class JobportalComponent implements OnInit{

  /**
   *
   */
  constructor(private fb:FormBuilder) { }
  jobForm = this.fb.group({
    firstName:['',[Validators.required]],
    lastName:[''],
    contacts: this.fb.group({
      contactType:['-1',[emailOrPhoneRequired()]],
      email:[''],
      phone:['']
    }),
    skills:this.fb.array([])
  })



  ngOnInit(): void {
      
  }

preview:string="";

  save(){

  var a=this.jobForm.valid;
    if (!a) {
     null;
    }
    this.preview=JSON.stringify(this.jobForm.value);
  }

  get firstName(){
    return this.jobForm.get('firstName');
  }

  get contactType(){
    return this.jobForm.get('contacts.contactType');
  }

  getProgramLanguage(index:number){
    return this.skillForms.at(index).get('programLanguage');
  }


  get skillForms(){
    return this.jobForm.get('skills') as FormArray;
  }

  addASkillFormGroup(){
    this.skillForms.push(
      this.fb.group({
        programLanguage:['',[Validators.required]],
        experience: [0]
      })
    ) ;
  }


  removeSkillFormGroup(index:number){
    this.skillForms.removeAt(index);
  }


  sampleSetValue(){
    this.jobForm.setValue({
      firstName:'mustafa',
      lastName:'seker',
      contacts:{
        contactType:"email",
        phone:"123546",
        email:"test@test.com"
      },
      skills:[],
    })
  }

  samplePatchValue(){
    this.jobForm.patchValue({
      firstName:'test',
      contacts:{
        email:'deneme@deneme.com'
      },
    });
  }
}

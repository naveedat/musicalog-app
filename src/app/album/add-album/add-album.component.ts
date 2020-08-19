import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from './../../services/api.service';
import { Album } from 'src/app/models/album';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})

export class AddAlbumComponent implements OnInit {

  albumForm: FormGroup;
  name = '';
  artist = '';
  label = '';
  type = '';
  typeList = ['vinyl', 'CD'];
  stock = '';
  stockList = ['true', 'false'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.albumForm = this.formBuilder.group({
      name: [null, Validators.required],
      artist: [null, Validators.required],
      label: [null, Validators.required],
      type: [null, Validators.required],
      stock: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    const album = this.createAlbum();
    this.api.addAlbum(album)
      .subscribe((res: any) => {
        console.log(res);
        this.isLoadingResults = false;
        this.router.navigate(['/list-album']);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  createAlbum() {
    const album: Album = {
      id: undefined,
      name: this.albumForm.get('name').value,
      artist: this.albumForm.get('artist').value,
      type: this.albumForm.get('type').value,
      stock: this.albumForm.get('stock').value,
      albumInfo: {
        albumId: undefined,
        label: this.albumForm.get('label').value
      }
    }
    return album;
  }
}

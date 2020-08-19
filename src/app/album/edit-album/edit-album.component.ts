import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {

  albumForm: FormGroup;
  id: number;
  name = '';
  artist = '';
  label = '';
  type = '';
  typeList = ['vinyl', 'CD'];
  stock = '';
  stockList = ['true', 'false'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAlbumById(this.route.snapshot.params.id);
    this.albumForm = this.formBuilder.group({
      name: [null, Validators.required],
      artist: [null, Validators.required],
      label: [null, Validators.required],
      type: [null, Validators.required],
      stock: [null, Validators.required]
    });
  }

  getAlbumById(id: any) {
    this.api.getAlbumById(id).subscribe((data: any) => {
      this.id = data.id;
      this.albumForm.setValue({
        name: data.name,
        artist: data.artist,
        label: data.albumInfo.label,
        type: data.type,
        stock: data.stock
      });
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    const album = this.updateAlbum();
    this.api.updateAlbum(this.id, album)
      .subscribe((res: any) => {
        console.log(res);
        this.isLoadingResults = false;
        this.router.navigate(['/list-album']);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  updateAlbum() {
    const album: Album = {
      id: this.id,
      name: this.albumForm.get('name').value,
      artist: this.albumForm.get('artist').value,
      type: this.albumForm.get('type').value,
      stock: this.albumForm.get('stock').value,
      albumInfo: {
        albumId: this.id,
        label: this.albumForm.get('label').value
      }
    }
    return album;
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAlbumComponent } from './album/list-album/list-album.component';
import { AddAlbumComponent } from './album/add-album/add-album.component';
import { EditAlbumComponent } from './album/edit-album/edit-album.component';
import { DetailsAlbumComponent } from './album/details-album/details-album.component';

const routes: Routes = [
  {
    path: 'list-album',
    component: ListAlbumComponent,
    data: { title: 'List of Albums' }
  },  
  {
    path: 'add-album',
    component: AddAlbumComponent,
    data: { title: 'Add Album' }
  },
  {
    path: 'edit-album/:id',
    component: EditAlbumComponent,
    data: { title: 'Edit Album' }
  },
  {
    path: 'details-album/:id',
    component: DetailsAlbumComponent,
    data: { title: 'Album Details' }
  },
  { path: '',
    redirectTo: '/list-album',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

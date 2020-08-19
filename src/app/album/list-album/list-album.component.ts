import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from './../../services/api.service';
import { Album } from './../../models/album';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.scss']
})
export class ListAlbumComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'artist', 'type', 'stock', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Album>();;
  isLoadingResults = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getAlbums()
      .subscribe((res: any) => {
        this.dataSource.data = res as Album[];
        console.log(this.dataSource.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectToUpdate = (id: string) => {
    this.router.navigate(['/edit-album', id]);
  }

  deleteAlbum(id: any) {
    this.isLoadingResults = true;
    this.api.deleteAlbum(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.loadData();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}

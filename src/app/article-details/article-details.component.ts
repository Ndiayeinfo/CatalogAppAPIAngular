import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleDetail } from '../shared/article-detail.model';
import { ArticleDetailService } from '../shared/article-detail.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styles: [
  ]
})
export class ArticleDetailsComponent implements OnInit{

  constructor(public service:ArticleDetailService, private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: ArticleDetail) {
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id: number) {
    if(confirm('Etes-vous sur de vouloir supprimer ?'))
    this.service.deleteArticleDetail(id)
      .subscribe({
        next: res => {
          this.service.list = res as ArticleDetail[]
          this.toastr.error('Suppression réussie', 'Informations sur le produit')
        },
        error: err => {
          console.log(err)
        }
    })
  }
}

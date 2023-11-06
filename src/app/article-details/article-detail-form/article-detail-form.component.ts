import { Component } from '@angular/core';
import { ArticleDetailService } from 'src/app/shared/article-detail.service';
import { NgForm } from '@angular/forms';
import { ArticleDetail } from 'src/app/shared/article-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-detail-form',
  templateUrl: './article-detail-form.component.html',
  styles: [
  ]
})
export class ArticleDetailFormComponent {
  
  constructor(public service:ArticleDetailService, private toastr:ToastrService) {
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.articleId == 0) {
        this.insertRecord(form)
      } else {
        this.updateRecord(form)
      }
    }
  }

  insertRecord(form: NgForm) {
    this.service.postArticleDetail()
      .subscribe({
        next: res => {
          this.service.list = res as ArticleDetail[]
          this.service.resetForm(form)
          this.toastr.success('Ajout réussi', 'Informations sur le produit')
        },
        error: err => {
          console.log(err)
        }
      })
  }

  updateRecord(form:NgForm){
    this.service.putArticleDetail()
      .subscribe({
        next: res => {
          this.service.list = res as ArticleDetail[]
          this.service.resetForm(form)
          this.toastr.info('Modification réussie', 'Informations sur le produit')
        },
        error: err => {
          console.log(err)
        }
      })
  }
}

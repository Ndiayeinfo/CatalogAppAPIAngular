import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ArticleDetail } from './article-detail.model';
import { NgForm } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailService {

  url: string = environment.apiBaseUrl + '/ArticleDetail';
  list: ArticleDetail[] = []
  formData: ArticleDetail = new ArticleDetail()
  formSubmitted: boolean = false

  constructor(private http: HttpClient) { }
  
  refreshList() {
    this.http.get(this.url)
      .subscribe({
      next: res => {
        this.list = res as ArticleDetail[]
      },
      error: err => {
        console.log(err)
      }
    })
  }

  postArticleDetail() {
    return this.http.post(this.url, this.formData)
  }

  putArticleDetail() {
    return this.http.put(this.url + '/' + this.formData.articleId, this.formData)
  }

  deleteArticleDetail(id:number) {
    return this.http.delete(this.url + '/' + id)
  }

  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new ArticleDetail()
    this.formSubmitted = false
  }
}

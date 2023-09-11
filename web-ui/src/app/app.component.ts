import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, of, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  baseUrl:string = 'http://localhost:8010';
  todosObservable$ !: Observable<any>;
  showFormObservable$ : Subject<boolean>= new Subject<boolean>();


  title:string|undefined;
  description:string|undefined;
  dueDate:Date|undefined;


  showAddForm=false;


  constructor(private httpClient:HttpClient){
  }

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo()
  {

    const token = localStorage.getItem('access_token');

    const headers:HttpHeaders = new HttpHeaders(
    {
        'Authorization': 'Bearer '+token ?? ''
    });

    // this.todosObservable$ = this.httpClient.get(`${this.baseUrl}/todo`,{ headers});
    this.todosObservable$ = this.httpClient
                    .get(`${this.baseUrl}/todo`,{ headers})
                    .pipe(
                      tap(response => console.log(response))
                    );

  }

  displayAddForm():void{
    this.showFormObservable$.next(true);
  }

  submitTodo() {
    //assemble post data before submitting to the API
    const postData:any = 
    {
      title:this.title,
      description:this.description,
      dueDate:this.dueDate,
    }

    this.httpClient
      .post(`${this.baseUrl}/todo`,postData)
      .subscribe(response=>
      {
        this.showFormObservable$.next(false); //hide form
        this.fetchTodo();
      });
  }


  editTodo(todo:any)
  {
    console.log(todo);
  }
  
  

}

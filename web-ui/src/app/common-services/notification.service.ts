import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  positionClass ='toast-top-center';
  constructor(private toastr: ToastrService) { }
  
  showSuccess(message, title){

      this.toastr.success(message, title,{positionClass : this.positionClass})
  }
  
  showError(message, title){
      this.toastr.error(message, title)
  }
  
  showInfo(message, title){
      this.toastr.info(message, title)
  }
  
  showWarning(message, title){
      this.toastr.warning(message, title)
  }
  
}

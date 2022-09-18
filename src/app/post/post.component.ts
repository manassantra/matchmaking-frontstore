import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { FileuploadService } from '../services/fileupload.service';
import { PostService } from '../services/post.service';
import { UseraccountService } from '../services/useraccount.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  modal: any = {};
  postModal : any = {};
  fileList: any;
  post: any = [];
  publicPost: any = [];
  postImages: any = [];
  postUserDetails: any = [];
  imageUrl: any;
  postImageUrl = [];
  userDetails: any;
  fullname: any;
  getImage: any;
  profilePic: any;
  galleryImagerServer = "http://localhost/GalleryImages/"
  profileImagerServer = "http://localhost/ProfileImages/"
  id: any;
  urls: any = []
  uploadResponse: any ;
  postBatchId: any;


  constructor(
    private postSrvc: PostService, 
    private userSrvc: UseraccountService, 
    private toaster: ToastrService, 
    private fileService: FileuploadService
    ) { }
    

  ngOnInit(): void {
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    this.id = user.authId;
    this.userSrvc.userDetails().subscribe(res=>{
      this.userDetails = res ;
      this.fullname = this.userDetails.fullName;
    });
    this.userSrvc.getPicture(user.authId).subscribe(res=>{
      this.getImage = res;
      if(this.getImage.imageFilename == null) {
        this.profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&usqp=CAU"
      } else {
        this.profilePic = this.profileImagerServer + this.getImage.imageFilename
      }
    })
    this.postSrvc.getPost(user.authId).subscribe(res=>{
      this.post = res;
      console.log(this.post)
      this.postSrvc.getPublicPost(user.authId).subscribe(res=>{
        this.publicPost = res;
        this.publicPost.forEach((e:any) => {
           this.post.push(e);
        });
      })
    });
  }

  createPost(){
    this.postModal = {
      postDescription: this.modal.postDescription,
      postBatchId: this.postBatchId
    }
    this.postSrvc.createPost(this.postModal, this.id).subscribe(res=>{
      if (res){
        this.toaster.success("Post Created Successfully.", "Success !");
        setTimeout(()=>{
          window.location.reload();
        }, 2000);
      } else {
        this.toaster.warning("Error while creating post", "Error !");
        setTimeout(()=>{
          window.location.reload();
        }, 2000);
      }
    }, err=>{
      this.toaster.error("Error while creating post. \n" + `${{err}}`, "Error !");
      setTimeout(()=>{
        window.location.reload();
      }, 2000);
    })
  }
 
  onChange= (files:any) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload : File[] = files;
    const formData = new FormData();
    
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file'+index, file, file.name);
    });

    this.fileService.fileUploader(formData, this.id)
      .subscribe(res => {
        this.uploadResponse = res ;
        for (const f of this.uploadResponse) {
          this.urls.push(this.galleryImagerServer + f.fileName);
          this.postBatchId = f.postBatchId
        }
        console.log(this.uploadResponse);
      }, err=>{
        this.toaster.error("Images not attched ! \n" + `${{err}}`, "Error")
      });
  } 
}




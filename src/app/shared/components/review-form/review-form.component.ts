import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Review } from '../../models/review.model';
import { AlertifyService } from '../../services/alertify.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  message: any;
  reviewForm: FormGroup;
  currentRate = 0;
  content: string;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private alertService: AlertifyService,
    public dialogRef: MatDialogRef<ReviewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data;
    console.log(this.message);
   }

  ngOnInit(): void {
  }

  save(): void {
    console.log(this.currentRate);
    console.log(this.content);
    let review = new Review({
      rating: this.currentRate + '',
      content: this.content,
      createAt: new Date(),
      userId: JSON.parse(localStorage.getItem('currentUser')).userId,
      productId: this.message.productId
    });
    this.reviewService.postReview(review).subscribe((review: Review) => {
      console.log(review);
      this.alertService.success('Cảm ơn bạn đã nhận xét :)');
      this.dialogRef.close();
    },
    (_) => {
      this.alertService.error('Nhận xét chưa được lưu!');
    }
    )
  }

  public cancel() {
    this.dialogRef.close();
  }

}

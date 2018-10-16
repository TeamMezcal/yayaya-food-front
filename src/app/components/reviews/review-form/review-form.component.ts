import { Review } from './../../../shared/models/review.model';
import { Component, Output, Input, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  private static readonly IMG_PREVIEW: string = 'http://www.nfscars.net/static/img/not-found.png';

  @Input() review: Review= new Review();
  @Output() reviewSubmit: EventEmitter<Review> = new EventEmitter();
  @ViewChild('reviewForm') reviewForm: FormGroup;

  constructor(private changesDetector: ChangeDetectorRef) {}


  onSubmitReviewForm(): void {
    if (this.reviewForm.valid) {
      this.reviewSubmit.emit(this.review);
    }
  }

  reset(): void {
    this.review = new Review();
    this.reviewForm.reset();
  }

  canDeactivate(): boolean {
    return this.reviewForm.dirty ? window.confirm('Discard changes for Review? Are you sure?') : true;
  }


}


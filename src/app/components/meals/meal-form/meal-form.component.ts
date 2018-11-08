import { Meal } from './../../../shared/models/meal.model';
import { Component, Output, Input, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent {
  private static readonly IMG_PREVIEW: string = 'http://www.nfscars.net/static/img/not-found.png';

  @Input() meal: Meal = new Meal();
  @Output() mealSubmit: EventEmitter<Meal> = new EventEmitter();
  @ViewChild('mealForm') mealForm: FormGroup;
  previewImages: Array<string | ArrayBuffer> = [];

  constructor(private changesDetector: ChangeDetectorRef) { }

  onClickAddIngredient(ingredient: HTMLInputElement): void {
    const ingredientValue: string = ingredient.value;
    console.log(ingredientValue)
    if (ingredientValue && this.meal.ingredients.indexOf(ingredientValue) === -1) {
      this.meal.ingredients.push(ingredientValue);
    }
    ingredient.value = '';
  }

  onClickRemoveIngredient(ingredient: string): void {
    this.meal.ingredients = this.meal.ingredients.filter(i => i !== ingredient);
  }


  onClickAddTag(tag: HTMLInputElement): void {
    const tagValue: string = tag.value;
    if (tagValue && this.meal.tags.indexOf(tagValue) === -1) {
      this.meal.tags.push(tagValue);
    }
    tag.value = '';
  }

  onClickRemoveTag(tag: string): void {
    this.meal.tags = this.meal.tags.filter(t => t !== tag);
  }




  onChangeImageFile(image: HTMLInputElement): void {
    if (image.files) {
      this.previewImages = [];
      for (let i = 0; i < image.files.length; i++) {
        this.meal.imageFiles.push(image.files[i]);
        this.renderPreviewImg(image.files[i]);
      }
    }
  }

  onImgPreviewError(image: HTMLImageElement): void {
    image.src = MealFormComponent.IMG_PREVIEW;
  }

  onSubmitMealForm(): void {
    if (this.mealForm.valid) {
      const user = JSON.parse(localStorage.getItem("current-user"))
      this.meal.user = user.id;
      console.log(this.meal);
      this.mealSubmit.emit(this.meal)
    }
  }

  reset(): void {
    this.meal = new Meal();
    this.mealForm.reset();
  }

  canDeactivate(): boolean {
    return this.mealForm.dirty ? window.confirm('Discard changes for Meal? Are you sure?') : true;
  }

  private renderPreviewImg(imageFile: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      this.previewImages.push(reader.result);
      this.changesDetector.markForCheck();
    };
  }
}


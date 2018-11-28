import { Meal } from './../../../shared/models/meal.model';
import { Component, Output, Input, EventEmitter, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MapService } from './../../../shared/services/map.service'
import { HttpClient, HttpEventType } from '@angular/common/http';

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
  @ViewChild('search') searchElement: ElementRef;
  previewImages: Array<string | ArrayBuffer> = [];


  onCoordsCreateMealChanges: Subscription;
  onAdressCreateMealChanges: Subscription;
  selectedFile: File = null;


  onFileSelected(event) {
    this.selectedFile =<File> event.target.files[0]

  }
  onUpload(){
    const fd= new FormData;
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('cloudinary://829334976288298:WMj1aCSjT9BKm-mjDix45D23Ojg@hqmrkoujl', fd, {
      reportProgress: true,
      observe: 'events'
   })
    .subscribe(event =>{
      if(event.type ===HttpEventType.UploadProgress){
        console.log('Upload Progress: ' + Math.round(event.loaded/event.total * 100) + '%'
        )
      }else if(event.type === HttpEventType.Response){
        console.log(event)
      }
    })

  }

  constructor(private mapService: MapService, private changesDetector: ChangeDetectorRef, private http :HttpClient) { }

  ngOnInit() {

    this.mapService.autoCompleteCities(this.searchElement);

    this.onCoordsCreateMealChanges = this.mapService.onCoordsChanges()
      .subscribe((coordinates: Array<number>) => {
        this.meal.coordinates = coordinates;
      })

    this.onAdressCreateMealChanges = this.mapService.onAddressChanges()
      .subscribe((address: string) => {
        this.meal.address = address;
      })
  }

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
      this.mealSubmit.emit(this.meal)
      console.log(this.meal);
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


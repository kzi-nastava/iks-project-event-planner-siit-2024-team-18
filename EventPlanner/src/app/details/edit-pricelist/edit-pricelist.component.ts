import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-pricelist.component.html',
  styleUrls: ['./edit-pricelist.component.css']
})
export class EditPricelistComponent {
  solution: Service | Product;

  constructor(
    private dialogRef: MatDialogRef<EditPricelistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { solution: Service | Product }
  ) {
    this.solution = { ...data.solution };
  }

  onSave() {
    this.dialogRef.close(this.solution);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}

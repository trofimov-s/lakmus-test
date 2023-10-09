import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonPreviewComponent {
  @Input({ required: true })
  outputData: object;
}

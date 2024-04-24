import { render, screen } from '@testing-library/angular';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  it('should display dialog title, message, and buttons', async () => {
    const mockData = {
      title: 'Confirm remove hero',
      message: 'Are you sure, you want to remove an hero?',
      btnOkText: 'Confirm',
      btnCancelText: 'Cancel',
    };

    await render(ConfirmDialogComponent, {
      componentProviders: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    });

    const titleElement = screen.getByText(mockData.title);
    const messageElement = screen.getByText(mockData.message);
    const btnCancelElement = screen.getByText(mockData.btnCancelText);
    const btnOkElement = screen.getByText(mockData.btnOkText);

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(btnCancelElement).toBeInTheDocument();
    expect(btnOkElement).toBeInTheDocument();
  });
});

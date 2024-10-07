const { expect } = require('chai');

describe('Momo App Tests', () => {
    it('should login successfully', async () => {
        const allowButton = await $("accessibility id:btn_permission_noti");
        await allowButton.waitForDisplayed({ timeout: 10000 });
        await allowButton.click();

        const phoneInput = await $('[id="PhoneInput"]');
        await phoneInput.setValue('0988575556');

        const continueButton = await $('[id="Tiếp tục/Button"]');
        await continueButton.click();
        // Continue
        await passwordInput.setValue('password123');
        await loginButton.click();
        const homeScreen = await $('~HomeScreen');
        expect(await homeScreen.isDisplayed()).to.be.true;
    });

    it('should display correct account balance', async () => {
        const balanceElement = await $('~BalanceText');
        const balance = await balanceElement.getText();
        expect(balance).to.match(/^[0-9,]+$/);
    });

    it('should transfer money successfully', async () => {
        const transferButton = await $('~TransferButton');
        await transferButton.click();

        const recipientInput = await $('~RecipientInput');
        await recipientInput.setValue('0987654321');

        const amountInput = await $('~AmountInput');
        await amountInput.setValue('50000');

        const confirmButton = await $('~ConfirmTransferButton');
        await confirmButton.click();

        const successMessage = await $('~TransferSuccessMessage');
        await successMessage.waitForDisplayed({ timeout: 10000 });

        expect(await successMessage.isDisplayed()).to.be.true;

        const messageText = await successMessage.getText();
        expect(messageText).to.include('Chuyển tiền thành công');
    });
});
import { LightningElement, wire, track } from 'lwc';

// importing Apex class method
import retriveFiles from '@salesforce/apex/AruFilepreview.retriveFiles';

// importing navigation service
import { NavigationMixin } from 'lightning/navigation';

// extends the class to 'NavigationMixin'
export default class AruFilepreview extends NavigationMixin(LightningElement) {
    // reactive variables
    @track files;
    @track showModal = false;
    @track modalUrl = '';

    // Reteriving the files to preview
    @wire(retriveFiles)
    filesData({data, error}) {
        if(data) {
            window.console.log('data ===> ',data[0]);
            const dataList = data.map((item) => {
              let url =  '/sfc/servlet.shepherd/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId='+item.Id;
              if(item.FileExtension === 'docx')
                url =  '/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId='+item.Id;
              else if(item.FileExtension === 'pdf')
                url =  '/sfc/servlet.shepherd/version/renditionDownload?rendition=PDF&versionId='+item.Id;
              return {
                ...item,
                src: url,
                download: '/sfsites/c/sfc/servlet.shepherd/document/download/'+item.ContentDocumentId
              }
            })
            this.files = dataList;
        }
        else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }
    }

    filePreview(event) {
      this.modalUrl = event.currentTarget.dataset.url;
      this.showModal = true;
    }

    closeModal() {
      this.showModal = false;
    }

    download(event) {
      var link = document.createElement("a");
      link.setAttribute('download', 'download');
      link.href = event.currentTarget.dataset.url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
}
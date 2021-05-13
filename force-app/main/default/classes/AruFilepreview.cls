public with sharing class AruFilepreview {
    @AuraEnabled(cacheable=true)
    public static list<ContentVersion> retriveFiles(){
        return [SELECT Id, Title, FileExtension, ContentDocumentId From ContentVersion WHERE FILEEXTENSION IN ('docx', 'jpeg') LIMIT 17];
    }
}
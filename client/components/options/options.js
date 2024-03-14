import { ReactiveCache } from '/imports/reactiveCache';

Template.options.events({
    'click .js-open-header-board-menu': Popup.open('boardOptions'),
  });

  BlazeComponent.extendComponent({
    onCreated() {
      Meteor.subscribe('setting');
    },
  }).register('boardOptionsPopup');
  
  Template.boardOptionsPopup.helpers({
    templatesBoardId() {
      const currentUser = ReactiveCache.getCurrentUser();
      if (currentUser) {
        return currentUser.getTemplatesBoardId();
      } else {
        // No need to getTemplatesBoardId on public board
        return false;
      }
    },
    templatesBoardSlug() {
      const currentUser = ReactiveCache.getCurrentUser();
      if (currentUser) {
        return currentUser.getTemplatesBoardSlug();
      } else {
        // No need to getTemplatesBoardSlug() on public board
        return false;
      }
    },
    isSameDomainNameSettingValue(){
      const currSett = ReactiveCache.getCurrentSetting();
      if(currSett && currSett != undefined && currSett.disableRegistration && currSett.mailDomainName !== undefined && currSett.mailDomainName != ""){
        currentUser = ReactiveCache.getCurrentUser();
        if (currentUser) {
          let found = false;
          for(let i = 0; i < currentUser.emails.length; i++) {
            if(currentUser.emails[i].address.endsWith(currSett.mailDomainName)){
              found = true;
              break;
            }
          }
          return found;
        } else {
          return true;
        }
      }
      else
        return false;
    },
    isNotOAuth2AuthenticationMethod(){
      const currentUser = ReactiveCache.getCurrentUser();
      if (currentUser) {
        return currentUser.authenticationMethod.toLowerCase() != 'oauth2';
      } else {
        return true;
      }
    }
  });

  Template.boardOptionsPopup.events({
    'click .js-my-cards'() {
      Popup.back();
    },
    'click .js-due-cards'() {
      Popup.back();
    },
    'click .js-open-archived-board'() {
      Modal.open('archivedBoards');
    },
    'click .js-start-tour'(){
      ReactiveCache.getCurrentUser().setTutorialMode(true);
      Popup.back();
      setTimeout(() => {
        window.startIntro.start();
      }, '100');
      
    }
  });
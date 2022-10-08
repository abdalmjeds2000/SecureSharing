import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import * as ReactDom from 'react-dom';
import * as React from 'react'
import SecureSharingModal from './components/SecureSharingModal';
import Auth from './API/Auth.js';
import SharedBy from './API/SharedBy.js';
import pnp from 'sp-pnp-js';
import axios from 'axios';
import GetCurrentUser from './API/GetCurrentUser.js';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */

function formatSizeUnits(bytes: any){
  if      (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + " GB"; }
  else if (bytes >= 1000000)    { bytes = (bytes / 1000000).toFixed(2) + " MB"; }
  else if (bytes >= 1000)       { bytes = (bytes / 1000).toFixed(2) + " KB"; }
  else if (bytes > 1)           { bytes = bytes + " bytes"; }
  else if (bytes == 1)          { bytes = bytes + " byte"; }
  else                          { bytes = "0 bytes"; }
  return bytes;
}


export interface IDmsSecureSharingCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'DmsSecureSharingCommandSet';

export default class DmsSecureSharingCommandSet extends BaseListViewCommandSet<IDmsSecureSharingCommandSetProperties> {
  private modalPlaceHolder: HTMLDivElement = null;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized DmsSecureSharingCommandSet');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    compareOneCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }



  
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':

        // if(true) {
        //   GetCurrentUser(this.context.pageContext.user.email)
        //   .then((res: any) => {
        //     userId = res.data.Data.Id
        //     console.log(res)
        //   })
        //   .catch((err: any) => console.log(err))
        // }
        let CurrentUser = JSON.parse(localStorage.getItem("currentUser"));
        let RowDetails: any = {
          PrincipalId: CurrentUser.principalId,
          UserGraphId: CurrentUser.GraphId,
          UserEmail: this.context.pageContext.user.email,
          UniqueId: event.selectedRows[0].getValueByName("UniqueId").slice(1, -1),
          Item: event.selectedRows[0].getValueByName("FileLeafRef"),
          Type: event.selectedRows[0].getValueByName("ContentType"),
          Size: formatSizeUnits(event.selectedRows[0].getValueByName("SMTotalSize")),
          Directory: event.selectedRows[0].getValueByName("FileRef"),
          CreatedAt: event.selectedRows[0].getValueByName("Created"),
          LastModified: ""
        }
        localStorage.setItem("SelectedRowDetails", JSON.stringify(RowDetails))
        console.log(event.selectedRows[0])
        
        if(true) {
          let ResGETSharedBy: object = [];
          console.log('ResGETSharedBy', ResGETSharedBy)

          
          const GETSharedBy = async function () {
            const response = await Auth();
            if(response.data) {
              const responseSharedBy = await SharedBy(response?.data?.access_token);
              if(responseSharedBy.data) {
                ResGETSharedBy = responseSharedBy.data.Data;
                console.log('ResGETSharedBy | Shared By', ResGETSharedBy);
                localStorage.setItem("SharedByData", JSON.stringify(responseSharedBy.data.Data));
                localStorage.setItem("CustomModalLoader", "false");
              }
            } else {
              console.log("AUTH ERROR ::: ", response);
            }
          }
          GETSharedBy()
          .then(() => {
            this.modalPlaceHolder = document.body.appendChild(document.createElement("div"));
            ReactDom.render(React.createElement(SecureSharingModal, {}), this.modalPlaceHolder);
          })
          .catch(err => console.log(err))
        }



        

        break;
      default:
        throw new Error('Unknown command');
    }
  }





  
  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand && this.context.pageContext.list.title === "KSA") {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './DuckController'
import Dashboard from './Home'
import Users from './Users'
import Devices from './Devices'
import Invitations from './Invitations'
import Fleets from './Fleets'
import Files from './Files'
import Applications from './Applications'
import About from './About'
import Settings from './Settings'

function mapStateToProps(state, props) {
    return {
        splitViewId: state.AdminDashboard.splitViewId,
        paneOpened: state.AdminDashboard.paneOpened,
        location: state.AdminDashboard.location,
        index: state.AdminDashboard.index,
        router: state.AdminDashboard.router,
        splitViewConfigs: state.AdminDashboard.splitViewConfigs,
        mode: state.AdminDashboard.mode,
        actionList: state.AdminDashboard.actionList,
        currentItem: state.AdminDashboard.currentItem,
        dataSource: state.AdminDashboard.dataSource,
        isLoading: state.AdminDashboard.isLoading,
        isError: state.AdminDashboard.isError
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        closePane: bindActionCreators(Actions.closePane, dispatch),
        changeLocation: bindActionCreators(Actions.changeLocation, dispatch),
        changeIndex: bindActionCreators(Actions.changeIndex, dispatch),
        changeItemList: bindActionCreators(Actions.changeItemList, dispatch),
        changeActionList: bindActionCreators(Actions.changeActionList, dispatch),
        changeCurrentItem: bindActionCreators(Actions.changeCurrentItem, dispatch),
        changeEndpoint: bindActionCreators(Actions.changeEndpoint, dispatch),
        fetchDataSuccess: bindActionCreators(Actions.fetchDataSuccess, dispatch),
        fetchDataFailure: bindActionCreators(Actions.fetchDataFailure, dispatch),
        fetchData: (api) => dispatch(Actions.fetchData(api))
    }
    return { actions }
}

class BodyAdminDashboard extends Component {

    handleCommandInvoked(newLocation, newIndex) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.changeIndex(newIndex)
        this.props.actions.changeActionList(null)
        this.props.actions.changeCurrentItem(null)
        this.props.actions.closePane()
    }

    render() {
        let contentComponent

        switch (this.props.router[this.props.index].label) {
            
            case "Dashboard":
                contentComponent = <div className="dashboard" ><Dashboard location={this.props.location} /></div>
                break
            case "Devices":
                contentComponent = <div className="devices" ><Devices fetchData={this.props.actions.fetchData} isLoading={this.props.isLoading} isError={this.props.isError} mode={this.props.mode} location={this.props.location} sort={this.props.dataSource.sort} itemList={this.props.dataSource.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} actionList={this.props.actionList} /></div>
                break
            case "Invitations":
                contentComponent = <div className="invitations" ><Invitations fetchData={this.props.actions.fetchData} isLoading={this.props.isLoading} isError={this.props.isError} mode={this.props.mode} location={this.props.location} sort={this.props.dataSource.sort} itemList={this.props.dataSource.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} actionList={this.props.actionList} /></div>
                break
            case "Fleets":
                contentComponent = <div className="fleets" ><Fleets fetchData={this.props.actions.fetchData} isLoading={this.props.isLoading} isError={this.props.isError} mode={this.props.mode} location={this.props.location} actionList={this.props.actionList} sort={this.props.dataSource.sort} itemList={this.props.dataSource.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} currentItem={this.props.currentItem} changeCurrentItem={this.props.actions.changeCurrentItem}/></div>
                break
            case "Files":
                contentComponent = <div className="files" ><Files fetchData={this.props.actions.fetchData} isLoading={this.props.isLoading} isError={this.props.isError} mode={this.props.mode} location={this.props.location} actionList={this.props.actionList} sort={this.props.dataSource.sort} itemList={this.props.dataSource.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} /></div>
                break
            case "Applications":
                contentComponent = <div className="applications" ><Applications fetchData={this.props.actions.fetchData} isLoading={this.props.isLoading} isError={this.props.isError} mode={this.props.mode} location={this.props.location} actionList={this.props.actionList} sort={this.props.dataSource.sort} itemList={this.props.dataSource.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} /></div>
                break
            case "Users":
                contentComponent = <div className="users" ><Users fetchData={this.props.actions.fetchData} isLoading={this.props.isLoading} isError={this.props.isError} mode={this.props.mode} location={this.props.location} sort={this.props.dataSource.sort} itemList={this.props.dataSource.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} actionList={this.props.actionList} /></div>
                break
            case "Settings":
                contentComponent = <div className="settings" ><Settings mode={this.props.mode} location={this.props.location} onNavigate={this.props.actions.changeLocation} /></div>
                break
            case "About":
                contentComponent = <div className="about" ><About mode={this.props.mode} location={this.props.location} onNavigate={this.props.actions.changeLocation} /></div>
                break
            default: 
                contentComponent = <h2 className="win-h2" style={{ marginLeft: '10px' }}> {this.props.location} </h2>
        }

        let pane = (
            <div>
                {this.props.router.map((item, index) =>
                <ReactWinJS.SplitView.Command
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    style={item.style}
                    onInvoked={() => this.handleCommandInvoked([item.label], index)}
                />)}
            </div>
        )

        return (
            <ReactWinJS.SplitView
                id={this.props.splitViewId}
                paneComponent={pane}
                style={{ height: 'calc(100% - 48px)' }}
                contentComponent={contentComponent}
                paneOpened={this.props.paneOpened}
                onAfterClose={this.props.actions.closePane}
                {...this.props.splitViewConfigs[this.props.mode]}
            />
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyAdminDashboard)
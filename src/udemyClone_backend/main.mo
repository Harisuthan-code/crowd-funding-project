import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Submain "../campaign/submain";
import Cycles "mo:base/ExperimentalCycles";
import Nat8 "mo:base/Nat8";
import Array "mo:base/Array";


actor Main {

    private type Listing = {

        can_id : Principal;
        amount : Nat
    };

    private type secondListing = {

        ownerid : Principal;
        amount : Nat
    };

     private type thirdListing = {

        canisterId : Principal;
        status : Text
    };



    var owner_of_canister = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var allcanisters : [Principal] = [];
    var canidamount = HashMap.HashMap<Principal , Nat>(1, Principal.equal, Principal.hash);
    var funddetails: HashMap.HashMap<Principal, List.List<Listing>> = HashMap.HashMap<Principal, List.List<Listing>>(1, Principal.equal, Principal.hash);
    var forrefund: HashMap.HashMap<Principal, List.List<secondListing>> = HashMap.HashMap<Principal, List.List<secondListing>>(1, Principal.equal, Principal.hash);
    var statusofcampaign: HashMap.HashMap<Principal, List.List<thirdListing>> = HashMap.HashMap<Principal, List.List<thirdListing>>(1, Principal.equal, Principal.hash);

    public shared(msg) func add_campaign(name : Text , title : Text,description : Text,category : Text,image : [Nat8],goalamount : Nat,date : Nat
    ): async Bool {


        Debug.print(Principal.toText(msg.caller));

        let ownerId : Principal = msg.caller;

        Cycles.add <system> (8_000_000_000_000);



        let canister_add = await Submain.Submain(ownerId , name , title, description, category, image, goalamount, date);
        let can_id : Principal = await canister_add.get_id();

        addcan_id(can_id);

        let result = await add_campaign_list(ownerId, can_id);

        if (result) {
            return true;

        } 
        
        else {
            return false;

        }
    };

    public func add_campaign_list(ownerId : Principal, can_id : Principal): async Bool {
        var data_of_canister : List.List<Principal> = switch (owner_of_canister.get(ownerId)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        data_of_canister := List.push(can_id , data_of_canister);
        owner_of_canister.put(ownerId, data_of_canister);

        return true;
    };

    public func addcan_id(can_id : Principal){

      allcanisters := Array.append<Principal>(allcanisters , [can_id]);

    };

    public query func show_all_canister():async [Principal]{

        return allcanisters;
    };


  public shared(msg) func add_fund_list(own_id: Principal, amount: Nat): async Bool {


    Debug.print(debug_show(msg.caller));
   

    let currentList = switch (funddetails.get(msg.caller)) {
        case (?existingListings) existingListings;
        case (_) List.nil<Listing>();
    };


    var isupdated: Bool = false;

    let updatedlist = List.map<Listing, Listing>(currentList, func(entry: Listing): Listing {
        if (entry.can_id == own_id) {
            isupdated := true;
            { can_id = entry.can_id; amount = entry.amount + amount };
        } else {
            entry;
        }
    });

    let finalList = if (isupdated) {
        updatedlist
    } else {

        List.push({ can_id = own_id; amount = amount }, updatedlist);
    };

    funddetails.put(msg.caller, finalList);



    let currentsecondList = switch (forrefund.get(own_id)) {
        case (?existingListings) existingListings;
        case (_) List.nil<secondListing>();
    };


    var result: Bool = false;

    let newList = List.map<secondListing, secondListing>(currentsecondList, func(entry: secondListing): secondListing {
        if (entry.ownerid == msg.caller) {
            result := true;
            { ownerid = entry.ownerid; amount = entry.amount + amount };
        } else {
            entry;
        }
    });

    let finalresult = if (result) {
        newList
    } else {

        List.push({ ownerid = msg.caller; amount = amount }, newList);
    };

    forrefund.put(own_id, finalresult);



    let currentamount: Nat = switch (canidamount.get(own_id)) {
        case null {
            0;
        };
        case (?result) {
            result;
        };
    };

    let newamount = currentamount + amount;
    canidamount.put(own_id, newamount);

    return true;
};



    public query func show_amount(can_id : Principal):async Nat{


    let amount : Nat = switch(canidamount.get(can_id)){

        case null 0;
        case (?result) result;
    };

    Debug.print(debug_show(amount));

    return amount;

    };


    public func getfund_ids(userId: Principal): async [Listing] {
        switch (funddetails.get(userId)) {
            case (?listings) {
                return List.toArray(listings);
            };
            case null {
                return [];
            };
        };
    };


    public func addthestatus(userid: Principal, canid: Principal, estmateddate: Nat, todaydate: Nat, goalamount_spec: Nat):async Text{

    let currentamount: Nat = switch (canidamount.get(canid)) {
        case null { 0 };
        case (?result) { result };
    };



    let thirdList = switch (statusofcampaign.get(userid)) {
        case (?existingListings) existingListings;
        case (_) List.nil<thirdListing>();
    };




    var ishere : Bool = false;
    var isfailure : Bool = false;


    if (estmateddate == todaydate) {
        Debug.print("yes, it's the same date");

        let updatedList = List.map<thirdListing, thirdListing>(thirdList, func (listing) : thirdListing {

            if (listing.canisterId == canid) {

                ishere := true;

                var updatedStatus : Text = "";
            
                 if (goalamount_spec <= currentamount) {

                    updatedStatus := "Sucess";

                } 
                
                else {

                    updatedStatus := "failure";
                    isfailure := true;


                };


                { canisterId = listing.canisterId; status = updatedStatus };
            } 
            
            
            else {

                return listing;
            }

        });



        let finalresult = if (ishere) {
        updatedList;
        } 
        
        else {

         List.push({ canisterId = canid; status = if (goalamount_spec <= currentamount) { "success" } else { "failure" } }, updatedList)
        
        };



        statusofcampaign.put(userid, finalresult);

        return "okk succefully delated";
    } 
    
    else {

        Debug.print("Estimated date does not match today's date");

        let updatedList = List.map<thirdListing, thirdListing>(thirdList, func (listing) : thirdListing {
            if (listing.canisterId == canid) {
                ishere := true;
                return { canisterId = listing.canisterId; status = "pending" };
            } else {
                return listing;
            }
        });


        let finalUpdatedList = if (ishere) {
            updatedList
        } else {
            List.push({ canisterId = canid; status = "pending" }, updatedList)
        };

        statusofcampaign.put(userid, finalUpdatedList);


        return "still not";
    };


 
        
    };



}
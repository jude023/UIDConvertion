<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendingJudeEmail;
use App\Models\usertime;
use App\Models\details;
use App\Models\ImgList;
use App\Models\friend_con;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use DB;

class SendingEmailController extends Controller
{
    // public function send_email() 
    // {
    //     // return 
    //     $data1['data'] = "Sample Data will be passed on E-Mail";
    //     $data1['site'] = "https://translate.google.com/";
    //                 //email ng want issend email                        
    //     Mail::to("UnknownEmail.com")->send(new SendingJudeEmail($data1, '', 'EmailTemplate.Sending'));
    
    //     if (Mail::failures()) {
    //       return "NO-GOOD";
    //     } else{
    //         return "OK";
    //     }
    //   }
    public function GetUserList(){
          $data = DB::select("SELECT * FROM usertimes WHERE deleted_at IS NULL");
          return ($data);
        // return $data;
    }

      public function gitip(Request $request)
      {
        $client = $request->ip();
        return $client;
      }

      public function store(Request $request)
      {
        $TradeOrder = new usertime;
        $TradeOrder->name = $request->name;
        $TradeOrder->email = $request->email;
        $TradeOrder->password = Hash::make($request->password);
        $TradeOrder->ip = $request->ip;
        $TradeOrder->channel = '1';

        $TradeOrder->save();
        return response()->json('The post successfully added');
      }

      public function login(Request $request)
      {
        $validate_admin = usertime::select('*')->where('email' , '=', $request->email)->get();
        if ($validate_admin && Hash::check($request->password, $validate_admin[0]->password)) {
          $key = config('app.SECRETKEY');
          $validate_admin[0]['key'] = $key;
          return $validate_admin;
      }
        // $data = usertime::orderBy('created_at', 'desc')->get();
        // return $data;
      }

      public function GetUsers()
      {
        $data = usertime::orderBy('created_at', 'desc')->get();
        return $data;
      }

      public function GetChatBotDetails()
      {
        $data = details::select(
          'details.id',
          'details.IDNumber as DETAILSID',
          'usertimes.name',
          'details.Details',
          'details.created_at',
          'usertimes.id as USERID',
          'usertimes.ip',
          'usertimes.channel',
          // 'friend_cons.id as friend_consID',
          'details.ConFriend as ConFriend'
        )
        ->leftJoin('usertimes','usertimes.id','details.IDNumber')
        // ->rightJoin('friend_cons', 'friend_cons.id','details.ConFriend')
        // ->where('details.channel', '=' ,$id ) //parameter needes
        // ->where('details.ConFriend', '=' ,$id ) //parameter needes
        ->orderBy('details.id', 'DESC')->get();
        return $data;
      }

      public function TestCreateFriendCon(Request $request)
      {
        // return dd($request);
        $validConnection = friend_con::select('*')->where('Details' , '=', $request->name)->get();
        // return dd($this->$validate_admin);
        $length = count($validConnection); 
        // echo($length);
        if($length == 0){
          $friend_con = new friend_con;
          $friend_con->Details = $request->name;
          $friend_con->UsersIDCH = $request->id;
          $friend_con->updated_at = date('Y-m-d H:i:s');
          $friend_con->save();
          return response()->json('The post successfully added');
        }else{
          return response()->json('Existing Data');
      }
      }

      public function GetChatBotDetail(Request $request)
      {
        
        // return dd($request);
        $details = new details;
        $details->Name = $request->Name;
        $details->Details = $request->Details;
        $details->IDNumber = $request->IDNumber;
        $details->channel =  $request->CH;
        $details->ConFriend =  $request->CH;
        // $details->updated_at = date('Y-m-d H:i:s');
        $details->save();
        
        //  details::where('IDNumber',$request->IDNumber)
        //   ->update([
        //     'Name' => $request->Name,
        //     'Details' => $request->Details,
        //   ]);
        return response()->json('The post successfully added');
      }
     

      public function TRUNCATE(){

      $data  = DB::table('details')->delete();

        return $data;
      }

      public function upload_imageAdmin(Request $request)
      {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            if (!$file->isValid()) {
                abort(400, ' Invalid Upload File');
            }
            $newFileName = $request->input('ImageCode');
            $savePath = $newFileName . '.jpg';

            $webPath = '//WRR/' . $savePath;

            if (Storage::disk('WRR')->has($savePath)) {
                return response()->json(['path' => $webPath]);
            }
            if ($file->storePubliclyAs('', $savePath, ['disk' => 'WRR'])) {
                return response()->json(['path' => $webPath]);
            }
            abort(500, 'File upload failed');
        } else {
            abort(400, 'please select the file to upload');
        }
      }

      public function UpdateUser(Request $request){
        // return dd($request);
          usertime::where('id',$request->id)
          ->update([
            'name' => $request->name,
          ]);
      }

      public function GetImgs(){
        $data = ImgList::select('*')->get();
        return $data;
      }


      public function changech1(Request $request)
      {
        // return dd($request);
        // $details_datas = new details;
        // $details_datas->Name = $request->Name;
        // $details_datas->Details = $request->Details;
        // $details_datas->IDNumber = $request->IDNumber;
        // $details_datas->CH =  $request->CH;
        // // $details_datas->updated_at = date('Y-m-d H:i:s');
        // $details_datas->save();
        
        usertime::where('id',$request->id)
          ->update([
            'CH' => $request->CH1,
          ]);
        return response()->json('The post successfully added');
      }

      public function changech2(Request $request)
      {
        // return dd($request);
        // $details_datas = new details;
        // $details_datas->Name = $request->Name;
        // $details_datas->Details = $request->Details;
        // $details_datas->IDNumber = $request->IDNumber;
        // $details_datas->CH =  $request->CH;
        // // $details_datas->updated_at = date('Y-m-d H:i:s');
        // $details_datas->save();
        
        usertime::where('id',$request->id)
        ->update([
          'CH' => $request->CH2,
        ]);
        return response()->json('The post successfully added');
      }



      public function ToNotepad(Request $request)
      {
        // return dd($request);
        $DriveC = getenv('SystemDrive');
        $filePath = $DriveC . DIRECTORY_SEPARATOR . 'ConvertedToConracts';
        $PhoneNumber = $request->number;
        $valid = $request->isvalid == true ? 'TRUE' : 'FALSE';
        // return dd($valid);
        $content = "DATE:" . date('Y-m-d H:i:s') . "\r\n"  . "PhoneNumber: " . $PhoneNumber . " IsValid: " . $valid  ;
        $fileName = 'ConvertedToConracts_' . date('Y-m-d') . '.txt';
        
        if(!is_dir($filePath)){
          mkdir($filePath , 0777, true);
          if (!is_dir($filePath . DIRECTORY_SEPARATOR . 'ConvertedToConracts')) {
            // mkdir($filePath . DIRECTORY_SEPARATOR . 'ConvertedToConracts', 0777, true);
            file_put_contents($filePath . DIRECTORY_SEPARATOR  . $fileName, $content);
            // return dd($filePath . DIRECTORY_SEPARATOR  . $fileName, $content);
        }
        }else{
          // return dd(file_exiswts($filePath . DIRECTORY_SEPARATOR . $fileName));
          if(file_exists($filePath . DIRECTORY_SEPARATOR . $fileName)){
            $filePath2 = $DriveC . DIRECTORY_SEPARATOR . 'ConvertedToConracts';
            $fileName2 = 'ConvertedToConracts_' . date('Y-m-d') . '.txt';
            // return dd($filePath2 . DIRECTORY_SEPARATOR . $fileName2);
            $existingContent = file_exists($filePath2 . DIRECTORY_SEPARATOR . $fileName2);
            // return dd($filePath2 . DIRECTORY_SEPARATOR . $fileName2);
            if($existingContent == true){

              $getExitingFile = file_get_contents($filePath2 . DIRECTORY_SEPARATOR . $fileName2);
              // return dd($getExitingFile);
              $additionalContent = "\n" .  "PhoneNumber: " . $PhoneNumber . " isValid: " . $valid ;
              $modifiedContent = $getExitingFile .  $additionalContent;
              // return dd($modifiedContent);
              // return dd($filePath2 . DIRECTORY_SEPARATOR . $fileName2, $modifiedContent);
              file_put_contents($filePath2 . DIRECTORY_SEPARATOR . $fileName2, $modifiedContent);
            }
          }else{
            // file_put_contents($filePath . DIRECTORY_SEPARATOR  . $fileName, $content);
          }
        }
      }
}
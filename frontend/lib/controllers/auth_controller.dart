import 'package:kurskart/global_variables.dart';
import 'package:kurskart/models/user.dart';
import 'package:http/http.dart' as http;
import 'package:kurskart/services/manage_http_response.dart';
import '../services/manage_http_response.dart';

class AuthController {
  Future<void> signUpUsers({
    required context,
    required String email,
    required String fullName,
    required String password,
  }) async {
    try {
      User user = User(
        id: '',
        fullName: fullName,
        email: email,
        state: '',
        city: '',
        locality: '',
        password: password,
      );
      http.Response response = await http.post(
        Uri.parse('$uri/api/signup'),
        body: user.toJson(),
        headers: <String, String>{
          "Content-Type": 'application/json; charset=UTF-8',
        },
      );

      manageHttpResponse(
        response: response,
        context: context,
        onSuccess: () {
          showSnackBar(context, 'Your Account has been Created');
        },
      );
    } catch (e) {}
  }
}

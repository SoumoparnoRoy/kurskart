import 'package:flutter/material.dart';
import 'package:kurskart/views/screens/authetication_screens/login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: .fromSeed(seedColor: Colors.white.withValues(alpha: 0.95)),
      ),
      home: LoginScreen(),
    );
  }
}

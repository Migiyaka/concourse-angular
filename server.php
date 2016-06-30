<?php
	if (isset($_POST) && isset($_POST['action'])) {
		switch ($_POST['action']) {
			case 'login':
				login();
				break;
			case 'getAllDocumentIDs':
				getAllDocumentIDs();
				break;
			case 'addNewDocument':
				addNewDocument();
				break;
			case 'getDocumentWithID':
				getDocumentWithID();
				break;
		}
	}

	function login() {
		$url = 'http://localhost:17172/login';	
		$ch = curl_init($url);
		
		$request = array('username' => $_POST['username'], 'password' => $_POST['password']);
		
		curl_setopt_array($ch, array(
			CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => json_encode($request)
		));

		$response = curl_exec($ch);	
		curl_close($ch);
		
		die($response);
	}

	function getAllDocumentIDs() {
		$url = 'http://localhost:17172/';	
		$ch = curl_init($url);

		curl_setopt_array($ch, array(
			CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'X-Auth-Token: ' . $_POST['token']),
			CURLOPT_RETURNTRANSFER => 1
		));

		$response = curl_exec($ch);
		curl_close($ch);
		
		die($response);
	}

	function getDocumentWithID() {
		$url = 'http://localhost:17172/' . $_POST['itemID'];	
		$ch = curl_init($url);

		curl_setopt_array($ch, array(
			CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'X-Auth-Token: ' . $_POST['token']),
			CURLOPT_RETURNTRANSFER => 1
		));

		$response = curl_exec($ch);
		curl_close($ch);
		
		die($response);
	}

	function addNewDocument() {
		$url = 'http://localhost:17172/';	
		$ch = curl_init($url);

		curl_setopt_array($ch, array(
			CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'X-Auth-Token: ' . $_POST['token']),
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => json_encode($_POST['items'])
		));

		$response = curl_exec($ch);
		curl_close($ch);
		
		die($response);
	}

?>